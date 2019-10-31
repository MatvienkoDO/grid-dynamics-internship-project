#!/bin/bash

# start, if is not started
mongod --config /usr/local/etc/mongod.conf --fork

# open mongo repl for watching at data and etc
mongo

# shutdown server, when work is ended
TURN_OFF_SCRIPT=$(mktemp)
echo "use admin" > $TURN_OFF_SCRIPT
echo "db.shutdownServer()" >> $TURN_OFF_SCRIPT
echo "exit" >> $TURN_OFF_SCRIPT
mongo < $TURN_OFF_SCRIPT
rm $TURN_OFF_SCRIPT
