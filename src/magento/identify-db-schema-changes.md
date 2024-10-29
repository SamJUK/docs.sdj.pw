# Identifying DB Schema Changes

The command `setup:db:status` reporting `Declarative Schema is not up to date` after consecutive runs is a clear indicator something is not quite right. 

The script that I created gave us the following output, which allowed me to attribute the bug to the Amasty Rewards module.
```
Table ID: 409
  Operation: add_column
    NEW:
      - Name: expiration_id
      - Type: int
      - ElementType: column
      - TableName: amasty_rewards_rewards
```

## The Script

::: info
@TODO: Dig out updated version of this script
:::

Place the following content into a php file in your Magento root directory, and invoke it with the PHP cli tool.

```php
<?php

use Magento\Framework\App\Bootstrap, Magento\Catalog\Model\ResourceModel\Product\CollectionFactory;

require __DIR__ . '/app/bootstrap.php';
error_reporting(E_ALL & ~E_NOTICE);
$bootstrap = Bootstrap::create(BP, $_SERVER);
$obj = $bootstrap->getObjectManager();

$sd = $obj->get(\Magento\Framework\Setup\Declaration\Schema\Diff\SchemaDiff::class);
$sc = $obj->get(\Magento\Framework\Setup\Declaration\Schema\SchemaConfigInterface::class);

$dbSchema = $sc->getDbConfig();
$declarativeSchema = $sc->getDeclarationConfig();

$diff = $sd->diff($declarativeSchema, $dbSchema);
$changes = $diff->getAll();

foreach ($changes as $tableIndex => $operations) {
    echo "Table Index: $tableIndex", PHP_EOL;

    foreach ($operations as $operation => $data) {
        echo "  Operation: $operation", PHP_EOL;

        foreach ($data as $k => $history) {
            $oldDto = $history->getOld();
            $newDto = $history->getNew();

            if ($oldDto) {
                echo "    Old DtoObject:", PHP_EOL;
                echo "      - Name: {$oldDto->getName()}", PHP_EOL;
                echo "      - Type: {$oldDto->getType()}", PHP_EOL;
                echo "      - ElementType: {$oldDto->getElementType()}", PHP_EOL;

                if ($oldDto->getTable() && $oldDto->getTable()->getName()) {
                    echo "      - TableName: {$oldDto->getTable()->getName()}", PHP_EOL;
                }
            }

            if ($newDto) {
                echo "    New DtoObject:", PHP_EOL;
                echo "      - Name: {$newDto->getName()}", PHP_EOL;
                echo "      - Type: {$newDto->getType()}", PHP_EOL;
                echo "      - ElementType: {$newDto->getElementType()}", PHP_EOL;

                if ($newDto->getTable() && $newDto->getTable()->getName()) {
                    echo "      - TableName: {$newDto->getTable()->getName()}", PHP_EOL;
                }
            }
        }
    }
}
```