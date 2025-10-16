package com.momo.common.vo.aligo.alimtalk.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.momo.common.vo.aligo.FormEncodable;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
@SuperBuilder
public abstract class AlimTalkRequestVO implements FormEncodable {
    protected String apikey;
    protected String userid;
    protected String senderKey;
}
