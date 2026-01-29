package me.alexandruc.summerwell.api.artist;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;

@Data
@JsonPropertyOrder({ "id", "name", "image", "stageName", "day", "actStart", "actEnd", "priority", "description", "urlInstagram", "urlSpotify" }) 
public class ArtistData {
    private String id;
    private String name;
    private String image;
    private String stageName;
    private String actStart;
    private String actEnd;
    private Integer day;
    private Integer priority;
    private String description;
    private String urlInstagram;
    private String urlSpotify;
}