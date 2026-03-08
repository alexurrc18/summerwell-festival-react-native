package me.alexandruc.summerwell.map;

import org.springframework.stereotype.Component;

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