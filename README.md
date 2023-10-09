# node-check-update

Verify package file(s) engine settings against current nodejs/npm release.

## Usage

Compare engine settings against current release 
```shell
npx node-check-update
```

Compare engine settings against LTS release 
```shell
npx node-check-update --lts
npx node-check-update --lts=true
npx node-check-update --lts=false
```

Specify different working directory 
```shell
npx node-check-update --cwd=path/to/cwd
```

Specify different package file 
```shell
npx node-check-update --package-file=path/to/package.json
```

Use glob path 
```shell
npx node-check-update --package-file=**/package.json
```

Compare all package file(s) inside working directory 
```shell
npx node-check-update --deep
```

Use proxy to fetch release information 
```shell
npx node-check-update --proxy=https://proxy.example.com
```

Show help information
```shell
npx node-check-update --help
```

## Output

```shell
$ npx node-check-update
                                                    
 Engine settings               Node.js          NPM 
----------------------------------------------------
 package.json                        -            -
====================================================
 Current release               v20.8.0       10.1.0


 Update info                    System       Release
-----------------------------------------------------
 Node.js                      v18.15.0  →    v20.8.0
 NPM                             9.6.1  →     10.1.0

```

## Exit codes

The process exits with the code `0` if engine settings for node and NPM matches the latest releases.

If the engine setting for node does not include the latest release then the program exits with the code `2`.

If the engine setting for NPM does not include the latest release then the program exits with the code `4`.

If both, the engine setting for node and NPM does not include the latest releases then the program exits with the code `6`.

If some error occurred then the program exits with the code `1`. This includes HTTP fetch errors of the release information. 

## CI/CD usage

Example of a `.gitlab-ci.yaml` configuration
```yaml
node-check-update:
  stage: test
  needs: [ ]
  image:
    name: node:18.15.0
    pull_policy: if-not-present
  script:
    - npx --yes node-check-update
      --proxy="http://${PROXY_HOST}:${PROXY_PORT}"
      --lts
  allow_failure:
    exit_codes:
      - 2
      - 4
      - 6
```
