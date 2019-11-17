import Vue from "vue";

export const baseApiUrl = "http://ec2-3-15-149-11.us-east-2.compute.amazonaws.com:3800";
export const userKey = "__kb_user_key";

export const showError = e => {
  if (e && e.response && e.response.data) {
    Vue.toasted.global.defaultError({ msg: e.response.data });
  } else if (typeof e === "string") {
    Vue.toasted.global.defaultError({ msg: e });
  } else {
    Vue.toasted.global.defaultError({ msg: e });
  }
};

export default { baseApiUrl, showError, userKey };
