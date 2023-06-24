package com.example.demo.controller;

import com.example.demo.service.api.BusinessService;
import com.example.demo.service.api.SecurityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class _BaseController {

    protected static Logger logger = LoggerFactory.getLogger("Controller Layer");

    @Autowired
    SecurityService userService;

    @Autowired
    public BusinessService businessService;
}
