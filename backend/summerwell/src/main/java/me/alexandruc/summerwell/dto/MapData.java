package me.alexandruc.summerwell.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Data;

@Data
@JsonPropertyOrder({ "id", "edition", "category", "idCategory", "lon", "lat"})
public class MapData {

    private Long id;
    private Integer edition;
    private String category;
    private String idCategory;
    private float lon;
    private float lat;


}