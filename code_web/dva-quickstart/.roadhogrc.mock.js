import mockjs from "mockjs";
import { delay } from "roadhog-api-doc";

// 是否禁用代理
const noProxy = process.env.NO_PROXY === "false";

let proxy = {
  // 支持值为 Object 和 Array
  "GET /api/currentUser": {
    $desc: "获取当前用户接口",
    $params: {
      pageSize: {
        desc: "分页",
        exp: 2
      }
    },
    $body: {
      name: "Serati Ma",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
      userid: "00000001",
      notifyCount: 12
    }
  },
  "GET /mock/users": (req, res) => {
    res.json(
      mockjs.mock([
        {
          id: 1,
          name: "@cname"
        },
        {
          id: 2,
          name: "李四"
        }
      ])
    );
  },
  "POST /mock/api/oauth/token": {
    $body: mockjs.mock({
      "result|1": true
    }).result
  }
};

proxy = Object.assign(proxy);

// proxy = { ...proxy,  };

export default (noProxy ? {} : delay(proxy, 500));
