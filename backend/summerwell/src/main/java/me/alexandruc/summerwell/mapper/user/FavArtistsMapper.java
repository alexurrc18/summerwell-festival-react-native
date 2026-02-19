package me.alexandruc.summerwell.mapper.user;

import org.springframework.stereotype.Component;

import me.alexandruc.summerwell.dto.user.FavArtistsData;
import me.alexandruc.summerwell.entity.user.FavArtists;


@Component
public class FavArtistsMapper {

    public FavArtistsData toData(FavArtists entity) {
        FavArtistsData data = new FavArtistsData();
        data.setArtist(entity.getArtist());
        return data;
    }
    
}
