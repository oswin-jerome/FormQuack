package in.oswinjerome.FormQuackBackend.controllers;

import in.oswinjerome.FormQuackBackend.services.AnalyticsService;
import in.oswinjerome.FormQuackBackend.utils.ResponsePayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/analytics")
public class AnalyticsController {

    @Autowired
    AnalyticsService analyticsService;

    @GetMapping("monthly")
    public ResponseEntity<ResponsePayload> monthlyAll(){


        return  analyticsService.monthlyAll();
    }

    @GetMapping("dashboard")
    public ResponseEntity<ResponsePayload> getDashboardData(){


        return  analyticsService.getDashboardData();
    }

}
