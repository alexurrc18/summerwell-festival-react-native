package me.alexandruc.summerwell.mapper;

import org.springframework.stereotype.Component;

import me.alexandruc.summerwell.dto.MapData;
import me.alexandruc.summerwell.entity.Map;

@Component
public class MapMapper {

    public MapData toMapData(Map map) {
        MapData mapData = new MapData();
        mapData.setId(map.getId());
        mapData.setEdition(map.getEdition());
        mapData.setCategory(map.getCategory());
        mapData.setIdCategory(map.getIdCategory());
        mapData.setLon(map.getLon());
        mapData.setLat(map.getLat());
        return mapData;
    
    }
}