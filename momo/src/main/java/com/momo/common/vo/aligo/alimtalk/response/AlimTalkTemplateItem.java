package com.momo.common.vo.aligo.alimtalk.response;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonIgnoreProperties(ignoreUnknown = true)
public class AlimTalkTemplateItem {
    @JsonAlias("senderKey")
    private String senderKey;
    @JsonAlias("templtCode")
    private String templtCode;

    @JsonAlias("templtContent")
    private String templtContent;

    @JsonAlias("templtName")
    private String templtName;

    @JsonAlias("templateType")
    private String templateType;

    @JsonAlias("templateEmType")
    private String templateEmType;

    @JsonAlias("templtTitle")
    private String templtTitle;

    @JsonAlias("templtSubtitle")
    private String templtSubtitle;

    @JsonAlias("templtImageName")
    private String templtImageName;

    @JsonAlias("templtImageUrl")
    private String templtImageUrl;

    @JsonAlias("status")
    private String status;

    @JsonAlias("inspStatus")
    private String inspStatus;

    // cdate는 API가 그대로 "cdate"로 주는 경우가 많아 별도 alias는 의미상 동일하지만 일관성 유지 차원에서 둡니다.
    @JsonAlias("cdate")
    private String cdate;

    @JsonAlias("block")
    private String block;

    @JsonAlias("comments")
    private List<Object> comments;

    // buttons는 snake/camel 모두 "buttons"일 가능성이 높지만 동일하게 alias 부여
    @JsonAlias("buttons")
    private List<AlimTalkTemplateButton> buttons;
}
