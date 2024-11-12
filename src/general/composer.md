# Composer

Composer is a dependency manager for PHP projects.

## Composer Patches

Occasionally you will need to edit the source code of an existing composer package. Likely to apply a hotfix before an official release, or in some very rare cases it may be the best option for customisation.

The [cweagans/composer-patches](https://github.com/cweagans/composer-patches) package allows us todo this.

## Composer Artifacts

::: tip
If your packages have a large file size, you will want to consider Git LFS or a private repository.
:::

If a module is not distributed via composer, we can still include it via composer by using the `artifacts` repository type in composer.

### Configure Composer
First we create a folder in the repository to store the artifacts, and configure it as a composer repository source.

```sh
mkdir -p packages/composer
composer config repositories._packages artifact ./packages/composer
```

### Prepare the Artifacts

Ensure the artifacts contain a `composer.json` file in the root. This is your usual `composer.json` file that will contain the module name, versions, requirements and autoloader configuration. If one does not exist, create it.

### Package the Artifact

Then package the artifact into a zip file in the directory we created during configuration.

We are going to include the version in the artifact name, as we can add additional versions easily. We can optionally remove older versions to clean up.

```sh
zip -r packages/composer/{vendor}-{module}-{version}.zip /tmp/MyPackage/
```



