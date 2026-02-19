package me.alexandruc.summerwell.mapper.user;

import org.springframework.stereotype.Component;

import me.alexandruc.summerwell.dto.user.UserData;
import me.alexandruc.summerwell.entity.user.User;

@Component
public class UserMapper {
    public UserData toData(User user) {
        UserData data = new UserData();
        data.setId(user.getId());
        data.setEmail(user.getEmail());
        data.setFirstName(user.getFirstName());
        data.setLastName(user.getLastName());
        data.setPhoneNumber(user.getPhoneNumber());
        data.setCountry(user.getCountry());
        data.setCity(user.getCity());
        data.setAddress(user.getAddress());
        return data;
    }
    
}