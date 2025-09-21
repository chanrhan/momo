package com.momo.common.vo.aligo.alimtalk.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class AlimTalkTemplateItem {
    private String senderKey;
    private String templtCode;
    private String templtContent;
    private String templtName;
    private String templateType;
    private String templateEmType;
    private String templtTitle;
    private String templtSubtitle;
    private String templtImageName;
    private String templtImageUrl;
    private String status;
    private String inspStatus;
    private String cdate;
    private List<Object> comments;
    private List<AlimTalkTemplateButton> buttons;

}
