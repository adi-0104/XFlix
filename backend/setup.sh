#setup for mongo files
mongo xflix --eval "db.dropDatabase()"
mongoimport -d xflix -c videos --file data/videos.json