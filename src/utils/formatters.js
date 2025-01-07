export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val?.charAt(0)?.toUpperCase()}${val?.slice(1)}`
}

export const createHtmlOTPVerifyEmail = (data) => {
  const otpPrev = Math.floor(data.OTP / 1000)
  const otpNext = data.OTP % 1000
  return `
     <div style="max-width: 520px; margin: 0 auto">
      <div
        style="
          vertical-align: top;
          text-align: left;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: -0.005em;
          color: #091e42;
          line-height: 20px;
        ">
        <div
          style="
            padding-top: 30px;
            padding-bottom: 20px;
            vertical-align: top;
            text-align: center;
          ">
          <a
            href="#"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=https://www.atlassian.com&amp;source=gmail&amp;ust=1725019577826000&amp;usg=AOvVaw0wPAfXjrs4gBVa5DEUi5rK"
            ><img
              src="https://ci3.googleusercontent.com/meips/ADKq_Na6XzjWLy087GFD9hbEVqXoklvXJNS90Id5N9MxbfEi4xqTyfVUuwJG-PPQvOSGaaoV_Hmp8_0sVuzpjjCAg-gS-OyuVLoCZvj9xOIyPeNjBlvbaMKaPJf9qjvRQErEmAZ9QNIYV4u4H0B49K_9zg=s0-d-e1-ft#https://id-mail-assets.atlassian.com/shared/id-summit/id-summit-email_logo_360x80_NEW.png"
              height="30"
              alt="Atlassian"
              style="
                line-height: 100%;
                outline: none;
                text-decoration: none;
                border: 0;
              "
              class="CToWUd"
              data-bit="iit"
          /></a>
        </div>
        <hr
          style="
            margin-top: 24px;
            margin-bottom: 24px;
            border: 0;
            border-bottom: 1px solid #c1c7d0;
          " />
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse">
          <tbody>
            <tr>
              <td align="center">
                <img
                  src="https://ci3.googleusercontent.com/meips/ADKq_NbpMMFqVi5tm5CYGs09iCodBybQn5XOrIqo7OBYG2ziU88GBH3yuWVNWpqVza_CprxKcOgjhCX-RcABOWvK9YkH9uMi_oW4jVYtxVqfRi_2buB7KI6iqnkDSh1M9yqArbStd1WW5GlDReF4tw=s0-d-e1-ft#https://id-mail-assets.atlassian.com/template/aid_signup_welcome_verify_adg/people.png"
                  height="175"
                  border="0"
                  alt=""
                  style="
                    border: 0;
                    line-height: 100%;
                    outline: none;
                    text-decoration: none;
                  "
                  class="CToWUd a6T"
                  data-bit="iit"
                  tabindex="0" />
                <div
                  class="a6S"
                  dir="ltr"
                  style="opacity: 0.01; left: 391.2px; top: 271.8px">
                  <span
                    data-is-tooltip-wrapper="true"
                    class="a5q"
                    jsaction="JIbuQc:.CLIENT"
                    ><button
                      class="VYBDae-JX-I VYBDae-JX-I-ql-ay5-ays CgzRE"
                      jscontroller="PIVayb"
                      jsaction="click:h5M12e; clickmod:h5M12e;pointerdown:FEiYhc;pointerup:mF5Elf;pointerenter:EX0mI;pointerleave:vpvbp;pointercancel:xyn4sd;contextmenu:xexox;focus:h06R8; blur:zjh6rb;mlnRJb:fLiPzd;"
                      data-idom-class="CgzRE"
                      jsname="hRZeKc"
                      aria-label="Download attachment "
                      data-tooltip-enabled="true"
                      data-tooltip-id="tt-c9"
                      data-tooltip-classes="AZPksf"
                      id=""
                      jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTgwODY5OTY3MzY0ODQxOTczOSJd; 43:WyJpbWFnZS9qcGVnIl0.">
                      <span class="OiePBf-zPjgPe VYBDae-JX-UHGRz"></span
                      ><span
                        class="bHC-Q"
                        data-unbounded="false"
                        jscontroller="LBaJxb"
                        jsname="m9ZlFb"
                        soy-skip=""
                        ssk="6:RWVI5c"></span
                      ><span
                        class="VYBDae-JX-ank-Rtc0Jf"
                        jsname="S5tZuc"
                        aria-hidden="true"
                        ><span class="bzc-ank" aria-hidden="true"
                          ><svg
                            viewBox="0 -960 960 960"
                            height="20"
                            width="20"
                            focusable="false"
                            class="aoH">
                            <path
                              d="M480-336L288-528l51-51L444-474V-816h72v342L621-579l51,51L480-336ZM263.72-192Q234-192 213-213.15T192-264v-72h72v72H696v-72h72v72q0,29.7-21.16,50.85T695.96-192H263.72Z"></path></svg></span
                      ></span>
                      <div class="VYBDae-JX-ano"></div>
                    </button>
                    </span
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h1
          style="
            margin-bottom: 0;
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 24px;
            font-weight: 500;
            letter-spacing: -0.01em;
            color: #172b4d;
            line-height: 28px;
            margin-top: 40px;
          ">
          Bạn đã sắp hoàn thành rồi!
        </h1>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          <a style="text-decoration: none; color: inherit"
            >Xin chào ${data.email},</a
          >
        </p>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          Mã xác minh của bạn là:
        </p>
        <table
          width="100%"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse">
          <tbody>
            <tr>
              <td align="center">
                <span
                  style="
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                      Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans,
                      Helvetica Neue, sans-serif;
                    font-size: 35px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    color: #172b4d;
                    line-height: 40px;
                    padding-right: 5px;
                  "
                  >${otpPrev}</span
                ><span
                  style="
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI,
                      Roboto, Oxygen, Ubuntu, Fira Sans, Droid Sans,
                      Helvetica Neue, sans-serif;
                    font-size: 35px;
                    font-weight: 500;
                    letter-spacing: -0.01em;
                    color: #172b4d;
                    line-height: 40px;
                    padding-left: 5px;
                  "
                  >${otpNext}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          Nhập mã xác minh này để tiếp tục thiết lập tài khoản Atlassian. Mã này
          sẽ hết hạn sau 10 phút.
        </p>
        <p
          style="
            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
              Oxygen, Ubuntu, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            font-size: 14px;
            font-weight: 400;
            letter-spacing: -0.005em;
            color: #091e42;
            line-height: 20px;
            margin-top: 12px;
          ">
          Nếu bạn không yêu cầu mã này, hãy bỏ qua email này.
        </p>
        <hr
          style="
            margin-top: 24px;
            margin-bottom: 24px;
            border: 0;
            border-bottom: 1px solid #c1c7d0;
          " />
        <div
          style="
            color: #707070;
            font-size: 13px;
            line-height: 19px;
            text-align: center;
            margin-top: 10px;
          ">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            bgcolor="#ffffff"
            align="center"
            style="border-collapse: collapse">
            <tbody>
              <tr>
                <td
                  valign="top"
                  align="center"
                  style="
                    padding-top: 10px;
                    line-height: 18px;
                    text-align: center;
                    font-weight: none;
                    font-size: 12px;
                    color: #505f79;
                  ">
                  <span>Đây là tin nhắn Atlassian Cloud gửi cho bạn</span><br />
                </td>
              </tr>
              <tr valign="top">
                <td
                  align="center"
                  style="padding-top: 15px; padding-bottom: 30px">
                  <a
                    href="#"
                    target="_blank"
                    data-saferedirecturl="https://www.google.com/url?q=https://www.atlassian.com&amp;source=gmail&amp;ust=1725019577827000&amp;usg=AOvVaw2BRTeSRU7tbCZsRsIrVRdf"
                    ><img
                      src="https://ci3.googleusercontent.com/meips/ADKq_NbKiDnhFfOAVr_X7wxGJlyVxY1JjjFSBZ7V-Xz7QqnmEG9ofVIyrlHH02gtNgxfvU3cqQkShDp5EpgfacA37f-M4L2sMthYT8nt91EYU9sRlb_09nvaNZqmrnMMZ92Y_XOP-pAsFjTZojSQ=s0-d-e1-ft#https://id-mail-assets.atlassian.com/shared/id-summit/id-summit-logo-email-footer.png"
                      width="114"
                      border="0"
                      alt="Atlassian"
                      style="
                        border: 0;
                        line-height: 100%;
                        outline: none;
                        text-decoration: none;
                        display: block;
                        color: #4c9ac9;
                      "
                      class="CToWUd"
                      data-bit="iit"
                  /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

export const paramsDecodeUrlBase64 = () => {
  const urlParams = window.location.href.split('/').pop()
  const base64String = decodeURIComponent(urlParams)
  const jsonString = atob(base64String)
  const objParams = JSON.parse(jsonString)
  return objParams
}

export const slugify = (val) => {
  if (!val) return ''
  return String(val)
    .replace(/Đ/g, 'D')
    .replace(/đ/g, 'd')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const convertTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
}

export const getDateTime = (dateTime) => {
  const dateObj = new Date(dateTime.date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  const formattedTime = dateTime.time.includes(":") ? `${dateTime.time}:00` : dateTime.time;
  return `${formattedTime} ${day}/${month}/${year}`;
};

export const formatDateTime = (dateTime) => {
  let time = dateTime.split(")")[1]
  const date = new Date(dateTime.split(")")[0] + ")");
  console.log('🚀 ~ formatDateTime ~ date:', date)

  if (isNaN(date)) {
    console.error("Invalid date");
    return null;
  }
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${time} ${day}/${month}/${year}`;
}
