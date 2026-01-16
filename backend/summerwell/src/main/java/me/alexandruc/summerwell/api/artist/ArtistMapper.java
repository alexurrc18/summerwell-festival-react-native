package me.alexandruc.summerwell.api.artist;

import me.alexandruc.summerwell.core.artist.Artist;
import org.springframework.stereotype.Component;

@Component
public class ArtistMapper {
    
    public ArtistData toData(Artist artist) {
        if (artist == null) return null;

        ArtistData data = new ArtistData();
        data.setId(artist.getId().toString());
        data.setName(artist.getName());
        data.setImage(artist.getImage());
        data.setDay(artist.getDayNumber());
        data.setStageName(artist.getStage().getName());
        data.setActStart(artist.getActStart().toString());
        data.setActEnd(artist.getActEnd().toString());
        data.setPriority(artist.getPriority());
        
        return data;
    }
}