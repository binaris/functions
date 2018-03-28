# No need to source this file by default. Only if you want to work against non-production (or customer-specifie) Binaris environments (realms).

export BINARIS_INVOKE_ENDPOINT=run-$realm.binaris.io
export BINARIS_DEPLOY_ENDPOINT=api-$realm.binaris.io
export BINARIS_LOG_ENDPOINT=logs-$realm.binaris.io
