package org.lucia.api.health;

import org.lucia.service.health.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import static org.springframework.http.HttpStatus.*;
import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
public class HealthResource {

    @Autowired
    private HealthService healthService;

    @RequestMapping(value = "/health", method = GET)
    @ResponseStatus(value = OK)
    public Map<String, Object> health() {
        return healthService.health();
    }
}
