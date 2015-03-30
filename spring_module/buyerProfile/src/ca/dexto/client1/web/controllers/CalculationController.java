package ca.dexto.client1.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CalculationController {

	@RequestMapping("/")
	public String showHome(){
		return "home";
	}

}
