package com.momo.common.vo;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.minidev.json.annotate.JsonIgnore;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AligoSMSSendVO {
    private String key;
    private String userId;
    private String sender;
    private String receiver;
    private String destination;
    private String msg;
    private String msgType;
    private String title;
    private String rdate; // 예약날짜
    private String rtime; // 예약시간
    private String image1;
    private String image2;
    private String image3;
    private String testmode_yn = "N";

    @JsonIgnore
    public MultiValueMap<String ,String> getFormValues(){
        MultiValueMap<String,String> form = new LinkedMultiValueMap<>();
        form.add("key", key);
        form.add("userid", userId);
        form.add("sender", sender);
        form.add("receiver", receiver); // 콤마로 여러 수신자 가능
        form.add("msg", msg);
        form.add("msgType", msgType);
        form.add("title", title);
        form.add("rdate", rdate);
        form.add("rtime", rtime);
        form.add("image1", image1);
        form.add("image1", image2);
        form.add("image1", image3);
        form.add("testmode_yn", testmode_yn);
        return form;
    }
}
