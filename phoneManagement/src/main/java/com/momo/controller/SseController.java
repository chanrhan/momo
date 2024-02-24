package com.momo.controller;

import com.momo.emitter.NotificationService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/sse")
@Slf4j
@RequiredArgsConstructor
public class SseController {
	private final NotificationService notificationService;
	@GetMapping(value = "/connect",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
	public ResponseEntity<SseEmitter> connect(@RequestHeader(value = "Last-Event-ID",required = false,defaultValue = "") String lastEventId, HttpServletResponse response, HttpSession session){
		response.setHeader("X-Accel-Buffering","no");
		return ResponseEntity.ok(notificationService.connect(lastEventId, session));
	}
}
