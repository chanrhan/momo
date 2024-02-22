package com.momo.config;


import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.HandshakeResponse;
import jakarta.websocket.server.HandshakeRequest;
import jakarta.websocket.server.ServerEndpointConfig;

public class HttpSessionConfigurater extends ServerEndpointConfig.Configurator {
	public static final String Session = "Session";
	public static final String Context = "Context";

	@Override
	public void modifyHandshake(ServerEndpointConfig config, HandshakeRequest request, HandshakeResponse response) {
//		super.modifyHandshake(config, request, response);
		HttpSession session = (HttpSession) request.getHttpSession();

		ServletContext context = session.getServletContext();
		config.getUserProperties().put(HttpSessionConfigurater.Session, session);
		config.getUserProperties().put(HttpSessionConfigurater.Context, context);
	}

}
