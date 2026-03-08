package me.alexandruc.summerwell.user.favorites;

import org.springframework.stereotype.Component;


@Component
public class FavArtistsMapper {

    public FavArtistsData toData(FavArtists entity) {
        FavArtistsData data = new FavArtistsData();
        data.setArtist(entity.getArtist());
        return data;
    }
    
}
