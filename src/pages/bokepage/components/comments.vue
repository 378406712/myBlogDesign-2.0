<template>
  <div>
    <section id="comments" class="comments">
      <div class="commentwrap clearFix">
        <div
          @click="watch_comment = true"
          class="notification animated"
          :class="watch_comment ? 'fadeOutDown' : ''"
        >
          <svg-icon icon-class="comment" />查看评论 -
          <span>NOTHING </span>
        </div>
      </div>
      <!-- 评论 -->
      <div class="set-comment" v-if="watch_comment">
        <div class="comments-main">
          <h3 id="comments-list-title">Comments | <span>NOTHING </span></h3>
          <div class="comment clearFix">
            <div class="contents">
              <div class="clearFix">
                <div class="main">
                  <div class="profile">
                    <a href="" target="_blank"
                      ><img
                        src="/static/image/register-logo.png"
                        width="24"
                        height="24"
                    /></a>
                  </div>
                  <section class="commeta">
                    <h4 class="author">
                      <a href="" target="_blank">
                        独酌
                      </a>
                    </h4>
                    <div class="info">
                      <time datetime="2020-05-18">发布于 35 分钟前</time>
                    </div>
                  </section>
                  <div class="body">
                    <p>hello</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="comment-respond">
          <form action="#" method="post" novalidate="">
            <p>
              <svg-icon icon-class="markdown" /> Markdown Supported while
              <svg-icon icon-class="code" /> Forbidden
            </p>
            <div class="comment-textarea">
              <textarea class="commentbody" rows="5" tabindex="4"></textarea
              ><label class="input-label active"
                >你是我一生只会遇见一次的惊喜 ...</label
              >
            </div>

            <div class="cmt-info-container">
              <div class="comment-user-avatar">
                <img src="/static/image/login-logo.png" />
                <div class="socila-check" style="display: block;">
                  <i class="fa fa-qq" aria-hidden="true"></i>
                </div>
              </div>
              <div class="cmt-popup cmt-author" onclick="cmt_showPopup(this)">
                <input
                  type="text"
                  placeholder="昵称或QQ号 (昵称 )"
                  name="author"
                  id="author"
                  value="独酌"
                  size="22"
                  autocomplete="off"
                  tabindex="1"
                  aria-required="true"
                />
              </div>
              <div class="cmt-popup">
                <input
                  type="text"
                  placeholder="邮箱 (必须* )"
                  name="email"
                  id="email"
                  value="582463379@qq.com"
                  size="22"
                  tabindex="1"
                  autocomplete="off"
                  aria-required="true"
                />
              </div>
              <div class="cmt-popup">
                <input
                  type="text"
                  placeholder="网站"
                  name="url"
                  id="url"
                  value=""
                  size="22"
                  autocomplete="off"
                  tabindex="1"
                />
              </div>
            </div>

            <p class="form-submit">
              <input
                name="submit"
                type="submit"
                id="submit"
                class="submit"
                value="BiuBiuBiu~"
              />
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      watch_comment: false
    }
  }
}
</script>

<style lang="scss" scoped>
.comments {
  clear: both;
  overflow: hidden;
  width: 100%;
  padding: 60px 0 80px;
  list-style: none;
  background: rgba(255, 255, 255, 0.8);
  padding: 0 10px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}
.comments .commentwrap {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 0;
}
.notification {
  max-width: 300px;
  margin: auto;
  text-align: center;
  border: 1px solid #ddd;
}
.comment-respond .logged-in-as,
.notification {
  padding: 19px 32px 17px;
  border-radius: 3px;
  background: #fff;
  color: #6f6f6f;
}
.comment-respond .logged-in-as svg,
.notification svg {
  margin-right: 10px;
  font-size: 16px;
}
.notification span {
  font-size: 13px;
  color: #b3b3b3;
  text-align: center;
}
.comments .comments-main {
  overflow: hidden;
  -webkit-transition: height 0s ease-out;
  -moz-transition: height 0s ease-out;
  transition: height 0s ease-out;
}
h3#comments-list-title {
  max-width: 860px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
  color: #7d7d7d;
  font-weight: 400;
}
#comments-list-title span {
  font-size: 13px;
  font-weight: 400;
  color: #909090;
}

.comment .contents {
  width: 100%;
  margin-bottom: 5px;
  float: left;
  padding-bottom: 25px;
}
.comment .main {
  float: right;
  width: 100%;
  padding: 0;
}
.comment .commeta {
  font-size: 16px;
  overflow: hidden;
  margin-bottom: 5px;
  text-transform: uppercase;
  color: #9499a8;
  margin-left: 50px;
}
.comment h4 {
  font-size: 15px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
  line-height: 20px;
  font-weight: 600;
  margin: 8px 0;
}
.comment h4 a {
  color: #69d2e7;
}
.object,
.comment .comment-reply-link {
  color: #69d2e7;
}
.comment .comment-reply-link {
  font-size: 12px;
  display: block;
  margin-left: 10px;
  float: right;
  text-transform: uppercase;
  color: #fff;
  background-color: #e2684a;
  line-height: 20px;
  padding: 0 6px;
  border-radius: 3px;
  opacity: 0;
}
.comment .contents:hover .comment-reply-link {
  opacity: 0.9;
}
.comment .info {
  margin-top: 2px;
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
  color: rgba(0, 0, 0, 0.35);
}
.comment .info {
  font-size: 12px;
  letter-spacing: 0;
  text-transform: none;
  color: rgba(0, 0, 0, 0.35);
}
.comment .profile img {
  width: 100%;
  max-width: 40px;
  height: 40px;
  border-radius: 100%;
  -webkit-transition: opacity 0.15s ease-out;
  -moz-transition: opacity 0.15s ease-out;
  transition: opacity 0.15s ease-out;
}
.comment .profile {
  float: left;
  margin-right: 10px;
  margin-top: 5px;
}
.comment .profile img {
  width: 100%;
  max-width: 40px;
  height: 40px;
  border-radius: 100%;
  -webkit-transition: opacity 0.15s ease-out;
  -moz-transition: opacity 0.15s ease-out;
  transition: opacity 0.15s ease-out;
}
.comment .body {
  line-height: 32px;
  color: #63686d;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
}
.comment-respond {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 0;
}
.comment-textarea {
  position: relative;
}
.comment-respond textarea {
  background-image: url(https://view.moezx.cc/images/2018/03/24/comment-bg.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
  resize: vertical;
  min-height: 55px;
  overflow: scroll;
}
.comment-respond textarea {
  display: block;
  float: none;
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  color: #535a63;
  border: 1px solid #ddd;
  background-color: transparent;
}
.commentbody:focus {
  border-color: #69d2e7 !important;
}
.commentbody:focus {
  transition: border-color 0.25s;
}
.comment-respond textarea:active,
.comment-respond textarea:focus {
  outline: 0;
}
.comment-respond textarea {
  display: block;
  float: none;
  width: 100%;
  height: 180px;
  margin-bottom: 10px;
  color: #535a63;
  border: 1px solid #ddd;
  background-color: transparent;
}
.comment-respond input {
  font-size: 14px;
  margin: 0;
  padding: 21px 21px 20px;
  background: #fff;
}
.commentbody:focus ~ .input-label {
  background-color: #69d2e7 !important;
}
.commentbody:focus ~ .input-label {
  color: #fff;
  transform: scale(0.75) translate(-2px, -37px);
  border-radius: 3px;
}
.input-label {
  position: absolute;
  left: 16px;
  top: 20px;
  padding: 0 6px;
  transform-origin: 0 0;
  pointer-events: none;
  transition: all 0.25s;
}

.comment-user-avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.comment-user-avatar .socila-check {
  display: block;
  width: 1.5em;
  height: 1.5em;
  font-size: 1em;
  line-height: 1.5em;
  text-align: center;
  color: #fff;
  border-radius: 50%;
  position: absolute;
  margin: -28px 0 0 42px;
}

.cmt-author {
  margin-left: 70px;
}

.cmt-popup {
  margin: 0 0 40px 1%;
  --widthA: 97%;
  --widthB: calc(var(--widthA) - 71px);
  --widthC: calc(var(--widthB) / 3);
  width: var(--widthC);
  margin-top: 10px;
}
.comment-respond .form-submit {
  clear: both;
  display: block;
  overflow: hidden;
  margin-bottom: 40px;
  padding: 0;
}
.comment-respond input[type='submit'] {
  width: calc(100%);
  margin: 0;
  padding: 15px 25px;
  text-transform: none;
  color: #535a63;
  background: 0 0;
  border-right: 0;
  -webkit-transition: all 0.1s ease-out;
  -moz-transition: all 0.1s ease-out;
  transition: all 0.1s ease-out;
  box-shadow: none;
  border: 1px solid #ccc;
  text-shadow: none;
  border-radius: 3px;
}
.comment-respond input,
.comment-respond textarea {
  font-size: 14px;
}
.cmt-info-container {
  width: 100%;
  display: -webkit-flex;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}
.comment-user-avatar {
  display: inline-block;
  width: 64px;
  height: 64px;
  margin-top: 10px;
  pointer-events: none;
}
textarea {
  border-radius: 3px;
}
input {
  font-family: Arial, Helvetica, sans-serif;
}
.comment-respond input[type='submit']:hover {
  color: #69d2e7;
}
.comment-respond input[type='submit']:hover {
  border-color: #69d2e7;
}
.comment-respond input:active,
.comment-respond input:focus,
.comment-respond textarea:active,
.comment-respond textarea:focus {
  outline: 0;
}

</style>
