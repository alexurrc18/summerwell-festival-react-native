package me.alexandruc.summerwell.core.stage;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StageService {
    public final StageRepository stageRepository;

    public List<Stage> getAllPublishedStages() {
        return stageRepository.findAllByPublished(true);
    }
    
    
}
