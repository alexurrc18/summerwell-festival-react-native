package me.alexandruc.summerwell.dto.user;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import me.alexandruc.summerwell.entity.Artist;

@Data
@JsonPropertyOrder({ "userId", "artistId"})
@AllArgsConstructor
@NoArgsConstructor
public class FavArtistsData {

    private Artist artist;

}
