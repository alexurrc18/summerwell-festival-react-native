package me.alexandruc.summerwell.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import lombok.Data;

@Data
@JsonPropertyOrder({ "id", "name", "color" })
public class StageData {

    private Long id;
    private String name;
    private String color;

}