package com.momo.common.util;

import org.apache.tomcat.util.codec.binary.Base64;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

public class SENSUtil {
    private static final String SERVICE_URL = "https://sens.apigw.ntruss.com/alimtalk/v2";
    private static final String ACCESS_KEY = "4tkwxtWPA3S5obnPGiFr";
    private static final String SECRET_KEY = "YoiBp69vC9IwXAPIyZEYBT4h0piB7bv7rHN7iaqR";
    private static final String SERVICE_KEY = "ncp:kkobizmsg:kr:3340797:wowbiz_test";

    public static void send(){
        StringBuilder urlBuilder = new StringBuilder();
        urlBuilder.append("/").append(SERVICE_KEY).append("/messages");

        try{
            URL url = new URL(urlBuilder.toString());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestProperty("Content-Type", "application/json; utf-8");
            conn.setRequestProperty("x-ncp-apigw-timestamp", new Timestamp(System.currentTimeMillis()).toString());
            conn.setRequestProperty("x-ncp-iam-access-key", ACCESS_KEY);
            conn.setRequestProperty("x-ncp-apigw-signature-v2", makeSignature());

        } catch (IOException | NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException(e);
        }
    }

    private static String makeSignature() throws NoSuchAlgorithmException, UnsupportedEncodingException, InvalidKeyException {
        String space = " ";					// one space
        String newLine = "\n";					// new line
        String method = "POST";					// method
        String url = SERVICE_URL;	// url (include query string)
        String timestamp = new Date(System.currentTimeMillis()).toString();			// current timestamp (epoch)
        String accessKey = ACCESS_KEY;		// access key id (from portal or Sub Account)
        String secretKey = SECRET_KEY;

        String message = new StringBuilder()
                .append(method)
                .append(space)
                .append(url)
                .append(newLine)
                .append(timestamp)
                .append(newLine)
                .append(accessKey)
                .toString();

        SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(signingKey);

        byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
        String encodeBase64String = Base64.encodeBase64String(rawHmac);

        return encodeBase64String;
    }

}
