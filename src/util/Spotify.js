const ClientId ='PersonalKey';
const redirectUri = 'http://localhost:3000/';
let accessToken = "personalAcccessToken";
const Spotify = {
    getAccessToken(){
        if(accessToken){
            /*console.log('access token has been retrieved' , accessToken);*/
            return accessToken;
        }
        // check for access token match 
        const accessTokenMatch =window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if(accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            //This clear the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
           
        }
        else{
            console.log('error after the first statement');
            const accessUrl =`https://accounts.spotify.com/authorize?client_id=${ClientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
            window.location = accessUrl;
            console.log('error in first statement at Spotify.js')
        }
    },
    search(term) {
        /*console.log('search method has been activated');*/
        const accessToken = Spotify.getAccessToken();
        /*if(accessToken){
            console.log('access token has been activated');
        }
        else{
            console.log('access token has not been activated');
        }*/
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            headers:{
            Authorization: `Bearer ${accessToken}`}
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks){
                return[];
            }
            /*console.log(jsonResponse.tracks.items.map(item =>({
                preview:item.preview_url
            })))*/

            return jsonResponse.tracks.items.map(track => ({
                id:track.id,
                name:track.name,
                artist:term,
                album: track.album.name, 
                uri: track.uri,
                preview: track.preview_url === null ? 'Preview is not available' : track.preview_url
        }));
    })
    },
    savePlaList(name,tracURis){
        if(!name || !tracURis.length ){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer  ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me',{
            headers:headers
    }).then(response => response.json()
    ).then(jsonResponse =>{
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
            headers:headers,
            method:'POST',
            body:JSON.stringify({name:name})
            }).then(response => response.json()
            ).then(jsonResponse =>{
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,{
                    headers:headers,
                    method:'POST',
                    body: JSON.stringify({uris:tracURis})
                }).then(()=>{
                    alert('Playlist has been created successfully');
                })
            }).catch(err => console.log(err , userId));
    })

    }

}

export default Spotify;