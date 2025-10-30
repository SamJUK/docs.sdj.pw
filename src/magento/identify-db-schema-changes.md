---
description: Magento database schema change detection and troubleshooting guide for setup upgrade issues.
---
# Identifying DB Schema Changes

Sometimes you run into a situation where even after a setup upgrade, the database state is still not up to date.

With the command `setup:db:status` reporting `Declarative Schema is not up to date` even after consecutive runs.


## Module

I've released a module, that introduces a verbose mode to the `setup:db:status` command. With the intention of it being able to be ran manually or within a CI environment.

The module can be found over on Github within the [m2-module-verbose-db-status](https://github.com/SamJUK/m2-module-verbose-db-status/) repository.

![Example out of the verbose db schema module](/images/db-schema-module.png)


## N98 Module

A variation of this is also available via the N98 module I maintain, that also contains a collection of other useful tooling.

The N98 module can be found also over on Github at //@TODO: Add Github Link

## Script

It is also sometimes handy to just have a quick and dirty script that you can dump into the root of your environment. 

And that is offered below, just copy it within your root and call it with the php cli command.

![Example out of the verbose db schema script](/images/db-schema-script.png)


Place the following content into a php file in your Magento root directory, and invoke it with the PHP cli tool.

```php
<?php
/**
 * Identify DB Schema differences in current (db) and target (xml files) state.
 * 
 * Usage:
 *  php ./z_identify_db_schema_diff.php [-v|--verbose]
 */

use Magento\Framework\App\Bootstrap;
require __DIR__ . '/app/bootstrap.php';
error_reporting(E_ALL & ~E_NOTICE);
$bootstrap = Bootstrap::create(BP, $_SERVER);
$obj = $bootstrap->getObjectManager();

const INDENT_TARGET = 4;
const INDENT_CHANGE = 8;

$isVerbose = count(array_filter($argv, static function($param) {
    return in_array($param, ['-v', '--verbose']);
})) > 0;

$schemaDiff = $obj->get('\Magento\Framework\Setup\Declaration\Schema\Diff\SchemaDiff');
$schemaConfig = $obj->get('\Magento\Framework\Setup\Declaration\Schema\SchemaConfigInterface');

$changes = $schemaDiff->diff(
    $schemaConfig->getDeclarationConfig(),
    $schemaConfig->getDbConfig()
)->debugChanges;

if (!$changes) {
    echo "Schema is up to date!", PHP_EOL;
    exit(0);
}

foreach ($changes as $operation => $targets) {
    echo "$operation: ", PHP_EOL;

    foreach ($targets as $target) {
        $oldData = extractData($target->getOld());
        $newData = extractData($target->getNew());
        $title = sprintf(
            '%s (%s)',
            $newData['name'],
            trim(implode(' ', [
            $newData['type'],
            $newData['element_type'],
            $newData['table']
            ]))
        );

        echo str_repeat(' ', INDENT_TARGET) . "Target: $title", PHP_EOL;

        foreach($newData as $k => $v) {
            if (!array_key_exists($k, $oldData) || $oldData[$k] !== $v) {
            echo sprintf(
                '%s%s: %s -> %s' . PHP_EOL,
                str_repeat(' ', INDENT_CHANGE),
                $k,
                str_replace("\n", " ", var_export(@$oldData[$k], true)),
                str_replace("\n", " ", var_export(@$newData[$k], true))
            );
            }
        }

        if ($isVerbose) {
            [$oldData, $newData] = shakeMutualData($oldData, $newData);
            echo sprintf(
            '%s%s: %s -> %s' . PHP_EOL,
            str_repeat(' ', INDENT_CHANGE),
            'data',
            json_encode($oldData),
            json_encode($newData)
            );
        }
    }
}

function shakeMutualData($oldData, $newData)
{
    $combinedKeys = array_unique([
        ...array_keys($oldData),
        ...array_keys($newData)
    ]);

    $diffKeys = array_filter(
        $combinedKeys,
        function ($k) use ($oldData, $newData) {
        return !(array_key_exists($k, $oldData)
            && array_key_exists($k, $newData)
            && $oldData[$k] === $newData[$k]);
        }
    );

    $filterCallback = static function ($k) use ($diffKeys) {
        return in_array($k, $diffKeys, true);
    };

    return [
        array_filter($oldData, $filterCallback, ARRAY_FILTER_USE_KEY),
        array_filter($newData, $filterCallback, ARRAY_FILTER_USE_KEY),
    ];
}

function extractData(?\Magento\Framework\Setup\Declaration\Schema\Dto\ElementInterface $element): array
{
    if ($element == null) {
        return [];
    }

    $params = $element instanceof \Magento\Framework\Setup\Declaration\Schema\Dto\ElementDiffAwareInterface ? $element->getDiffSensitiveParams() : [];
    $params['name'] = $element->getName();
    $params['type'] = $element->getType();
    $params['element_type'] = $element->getElementType();
    $params['table'] = $element instanceof \Magento\Framework\Setup\Declaration\Schema\Dto\TableElementInterface ? $element->getTable()->getName() : '';
    return $params;
}
```