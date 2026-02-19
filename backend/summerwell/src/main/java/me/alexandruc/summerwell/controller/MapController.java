package me.alexandruc.summerwell.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.dto.MapData;
import me.alexandruc.summerwell.mapper.MapMapper;
import me.alexandruc.summerwell.service.MapService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/public/map")
@AllArgsConstructor
public class MapController {

    private final MapMapper mapMapper;
    private final MapService mapService;



    private Map<String, Object> mapsResponse(List<MapData> maps) {
        return new HashMap<>() {{
            put("maps", maps);
        }};
    }


    @GetMapping
    public ResponseEntity<?> getMaps() {
        List<MapData> maps = mapService.getAllMaps().stream()
                .map(mapMapper::toMapData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(mapsResponse(maps));
    }
    


}