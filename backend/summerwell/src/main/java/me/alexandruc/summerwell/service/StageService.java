package me.alexandruc.summerwell.service;

import java.util.List;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import me.alexandruc.summerwell.entity.Stage;
import me.alexandruc.summerwell.repository.StageRepository;

@Service
@RequiredArgsConstructor
public class StageService {
    public final StageRepository stageRepository;

    public List<Stage> getAllPublishedStages() {
        return stageRepository.findAllByPublished(true);
    }
    
    
}
