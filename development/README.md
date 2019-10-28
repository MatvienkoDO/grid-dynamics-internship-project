update-local-db.sh - util for synchronizing local db with production db.
It requires password from dev-backup database user.
Example of usage:
PASSWORD=abcdef ./development/update-local-db.sh

local-db-start.sh
1) starts local db on background
2) launches mongo for watching on data and working with it
3) stops local db on ending working with mongo
Example of usage:
./development/local-db-start.sh
