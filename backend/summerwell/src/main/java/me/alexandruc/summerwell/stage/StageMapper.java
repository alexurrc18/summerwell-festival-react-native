package me.alexandruc.summerwell.stage;

import org.springframework.stereotype.Component;

@Component
public class StageMapper {

    public StageData toStageData(Stage stage) {
        StageData stageData = new StageData();
        stageData.setId(stage.getId());
        stageData.setName(stage.getName());
        stageData.setColor(stage.getColor());
        return stageData;
    }
}