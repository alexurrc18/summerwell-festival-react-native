package me.alexandruc.summerwell.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import me.alexandruc.summerwell.dto.StageData;
import me.alexandruc.summerwell.mapper.StageMapper;
import me.alexandruc.summerwell.service.StageService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/v1/public/stages")
@AllArgsConstructor
public class StageController {

    private final StageMapper stageMapper;
    private final StageService stageService;



    private Map<String, Object> stagesResponse(List<StageData> stages) {
        return new HashMap<>() {{
            put("stages", stages);
        }};
    }


    @GetMapping
    public ResponseEntity<?> getStages() {
        List<StageData> stages = stageService.getAllPublishedStages().stream()
                .map(stageMapper::toStageData)
                .collect(Collectors.toList());

        return ResponseEntity.ok(stagesResponse(stages));
    }
    


}