#!/bin/bash

# launch local mongo server if it is not launched
mongod --config /usr/local/etc/mongod.conf --fork
# save result of starting mongo server
SERVER_INITIAL_STATUS=$?

# wipes whole database
WIPE_SCRIPT=$(mktemp)
echo "use main" > $WIPE_SCRIPT
echo "db.dropDatabase()" >> $WIPE_SCRIPT
echo "exit" >> $WIPE_SCRIPT
mongo < $WIPE_SCRIPT
rm $WIPE_SCRIPT

HOST="gd-internship-ng-shard-0/gd-internship-ng-shard-00-00-efuaa.mongodb.net:27017,gd-internship-ng-shard-00-01-efuaa.mongodb.net:27017,gd-internship-ng-shard-00-02-efuaa.mongodb.net:27017"
DUMP_DIR=$(mktemp -d)
# It takes password from environment.
# For automated use set variable PASSWORD to desired password before launch
mongodump \
  --host $HOST \
  --ssl \
  --authenticationDatabase "admin" \
  --db "main" \
  --out $DUMP_DIR \
  --username "dev-backup" \
  --password "$PASSWORD"

# restores to local
mongorestore --dir $DUMP_DIR
# remove temporary dir
rm -r $DUMP_DIR

# if mongo server was not launched, restore initial state
if [ "$SERVER_INITIAL_STATUS" = "0" ]
then
  TURN_OFF_SCRIPT=$(mktemp)
  echo "use admin" > $TURN_OFF_SCRIPT
  echo "db.shutdownServer()" >> $TURN_OFF_SCRIPT
  echo "exit" >> $TURN_OFF_SCRIPT
  mongo < $TURN_OFF_SCRIPT
  rm $TURN_OFF_SCRIPT
fi
