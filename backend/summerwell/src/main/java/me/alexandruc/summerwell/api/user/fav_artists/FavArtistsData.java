package me.alexandruc.summerwell.api.user.fav_artists;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.alexandruc.summerwell.core.artist.Artist;

@Data
@JsonPropertyOrder({ "userId", "artistId"})
@AllArgsConstructor
@NoArgsConstructor
public class FavArtistsData {

    private Artist artist;

}
