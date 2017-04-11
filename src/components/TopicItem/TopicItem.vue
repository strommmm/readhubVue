<template>
  <div :key="key" ref="itemPc" class="topicItem" :class="{ 'topicItemRelatedFix': isRelated }">
    <span v-if="(!isRelated && isLastRead)" class="lastRead">上次看到这里</span>
    <hr v-if="!(!isRelated && isFirst)" class="bottom_hr" />
    <div class="info"
      :class="{
      'expaned' : isOpen,
      'enterHover': hover,
      'leaveHover': !hover}"
      @touchstart="_enterHover"
      @touchend="_leaveHover"
      @mouseover="_enterHover"
      @mouseout="_leaveHover"
      @click="_onTopicClick">
      <div class="left">
        <div class="title">
          {{titleSplits[0]}}
          <div class="inline-block">
            {{titleSplits[1]}}
            <span class="time">{{timeText}}</span>
          </div>
          <span class="toggleIcon" :class="{ 'up':isOpen, 'down':!isOpen}">
          </span>
        </div>
        <div v-if="summary" class="description">
          {{beautySummary(summary)}}
        </div>
      </div>
    </div>
    <collapse-transition>
      <div class="content" v-show="isOpen">
        <article-pad :articleArray="newsArray" :articleType="ARTICLE_TYPES.NEWS" />
        <article-pad :articleArray="weiboArray" :articleType="ARTICLE_TYPES.WEIBO" />
      </div>
    </collapse-transition>
    <div :style="{ clear: 'both' }" />
  </div>
</template>

<script>
import moment from 'moment'
import articlePad from './articlePad'
import logic from './logic'
import {typeset, beautySummary, splitTitle} from '../../utils/format'

import CollapseTransition from 'element-ui/src/transitions/collapse-transition'

const TOP_TEXT = '置顶'

export default {
  name: 'topicItem',
  props: ['topic', 'isLastRead', 'isFirst', 'isTop', 'openList', 'onTopicClick'],
  data () {
    const key = `topicPadPc-${this.topic.id}`
    const baseItem = this.topic.baseItem
    const isRelated = !!baseItem
    const collapseItemName = isRelated ? `${baseItem.id}-${this.topic.id}` : this.topic.id.toString()
    return {
      key,
      isRelated,
      collapseItemName,
      hover: false,
      ARTICLE_TYPES: logic.ARTICLE_TYPES
    }
  },
  computed: {
    title () {
      return typeset(this.topic.title)
    },
    timeText () {
      const createdAt = this.topic.createdAt
      moment.locale('zh-cn')
      const publishTime = moment(createdAt).fromNow()
      return (!this.isRelated && this.isTop) ? TOP_TEXT : publishTime
    },
    titleSplits () {
      return splitTitle(typeset(this.topic.title))
    },
    summary () {
      return typeset(this.topic.summary)
    },
    newsArray () {
      let newsArray = this.topic.newsArray
      newsArray = logic.mergeSimilar(newsArray, false)
      return newsArray
    },
    weiboArray () {
      return this.topic.weiboArray
    },
    isOpen () {
      const isOpen = this.openList.indexOf(this.collapseItemName) >= 0
      return isOpen
    }
  },
  methods: {
    _enterHover () {
      if (!this.hover) {
        this.hover = true
      }
    },
    _leaveHover () {
      if (this.hover) {
        this.hover = false
      }
    },
    _onTopicClick () {
      this.onTopicClick(this.collapseItemName)
    },
    collapseChange (activeNames) {
      console.log('activeNames', activeNames)
    },
    beautySummary
  },
  components: { articlePad, CollapseTransition }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang="less">
@import "../vars.less";

@iconTop : (38+ @marginSmall - 16 + 5)/2;

.topicItem{
    margin-top: @marginTop;
    .lastRead{
      text-align: center;
      display: block;
      font-size: 1.2rem;
      color: @colorInfo;
      margin-top: 30px;
    }
    .time{
      font-size: @fontSizeSmall;
      color: @colorInfo;
      margin-left: 10px;
      display: inline-block;
      font-weight: normal;
    }
    .info{
        cursor : pointer;
        position: relative;
        margin-bottom: @marginMiddle;
        .left{
            display: inline-block;
            box-sizing: border-box;
            width: 90%;
            .title{
                font-size: @fontSizeTitle;
                line-height: @lineHeightTitle;
                color: @colorTitle;
                font-weight: 500;
                position: relative;
                &.windowsPcFix{
                  font-weight: normal;
                }
            }
            .description{
                margin-left: 0px;
                margin-top: @marginSmall;
                color: @colorInfo;
                font-size: @fontSizeInfo;
                line-height: 1.6em;
            }
            .time{
                font-size: @fontSizeSmall;
                color: @colorInfo;
            }
        }
        .leftMobileFix {
          width: 100%;
        }
        .toggleIcon{
            position: absolute;
            top: 50%;
            margin-top : -5px;
            right: -40px;
            display: none;
            font-size: @fontSizeTitle;
            font-weight: normal;
            color: @colorInfo;
            width: 18px;
            height: 10px;
            background-image: url("../../assets/imgs/downarrow.png");
        }
        &:hover{
            .toggleIcon{
                display: block;
            }
        }
        &.enterHover{
            .toggleIcon{
                display: block;
            }
        }
        &.leaveHover{
            .toggleIcon{
                display: none;
            }
        }
         &.expaned{
            .toggleIcon{
              background-image: url("../../assets/imgs/uparrow.png");
                display: block;
            }
        }
    }
    .infoMobileFix {
        // margin-bottom: 32px;
    }
    .moreArticles{
      font-size: @fontSizeSmall;
      color: @colorTitle;
      float: right;
    }
    .content{
      margin-top: @marginMiddle;
        .header{
            color: @colorInfo;
            font-size: @fontSizeInfo;
            margin: @marginMiddle 0;
        }
        .mobileFixTopicArticle {
          margin-left: 0;
          margin-bottom: 20px;
        }
    }
    .footer {
      margin-top: @marginMiddle;
      .footerLeft {
        float: left;
        .time{
            font-size: @fontSizeSmall;
            color: @colorInfo;
        }
      }
      .footerRight {
        float: right;
        padding-right: 10px;
        position: relative;
        top: -4px;
        .toggle{
            right: @iconTop + @marginMiddle;
            font-size: @fontSizeTitle;
        }
      }
    }
    .bottom_hr{
        margin-top: @marginMiddle;
        margin-bottom: @marginMiddle;
        border: none;
        border-bottom: 1px solid @colorSplitLine;
        position: relative;
    }
}
.topicItemRelatedFix {
  margin-left: 40px;
  .bottom_hr{
    &:before{
      content : "相关";
      color: #A3A3A3;
      position: absolute;
      left: -1px;
      top: -5px;
      padding-right: 10px;
      background: #fff;
      font-size: 10px;
      z-index: 10;
    }
  }
}
.toggleLink {
  padding-top: 20px;
  padding-left: 30px;
  color: @colorToggleText;
  font-size: @fontSizeInfo;
  &:hover {
    color: @colorToggleText;
  }
}

&.hide {
    display : none;
}

.collapsePcFix {

}
.collapseMobileFix {

}

@media (max-width: 768px) {
    .topicItem{
        .info{
            .toggleIcon{
                right: -30px;
            }
        }
    }
    .topicItemRelatedFix{
      margin-left: 30px;
    }
}

@media screen and (-webkit-min-device-pixel-ratio: 2){
    .topicItem{
        .bottom_hr{
            border: 1px solid #fff;
            &:after{
                content: '';
                position: absolute;
                left: 0;
                bottom: 0;
                background: @colorSplitLine;
                width: 100%;
                height: 1px;
                -webkit-transform: scaleY(0.5);
                transform: scaleY(0.5);
                -webkit-transform-origin: 0 0;
                transform-origin: left bottom;
            }
        }
        .info{
          .toggleIcon{
            background-size:100% 100%;
            background-image: url("../../assets/imgs/downarrow@2x.png")!important;
          }
          &.expaned{
            .toggleIcon{
              background-image: url("../../assets/imgs/uparrow@2x.png")!important;
            }
          }
        }
    }
}

</style>
