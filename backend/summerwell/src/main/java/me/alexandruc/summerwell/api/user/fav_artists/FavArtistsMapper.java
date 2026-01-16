package me.alexandruc.summerwell.api.user.fav_artists;

import org.springframework.stereotype.Component;

import me.alexandruc.summerwell.core.user.fav_artists.FavArtists;

@Component
public class FavArtistsMapper {

    public FavArtistsData toData(FavArtists entity) {
        FavArtistsData data = new FavArtistsData();
        data.setArtist(entity.getArtist());
        return data;
    }

    
}
