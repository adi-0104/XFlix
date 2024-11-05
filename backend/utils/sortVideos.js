const sortVideos = (videoList, sortProp) => {
    if(sortProp === "viewCount"){
        //descending order
        return videoList.slice().sort((a,b) => b.viewCount - a.viewCount);
    }
    else{
        //sort by releasedate
        return videoList.slice().sort((a,b) => {
            let Adate = new Date(a.releaseDate);
            let Bdate = new Date(b.releaseDate);

            return Bdate - Adate;
        })
    }
}

module.exports = sortVideos;