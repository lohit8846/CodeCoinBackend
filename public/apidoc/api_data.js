define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/apidoc/main.js",
    "group": "C__Users_Lohit_documents_ascend_node_api_public_apidoc_main_js",
    "groupTitle": "C__Users_Lohit_documents_ascend_node_api_public_apidoc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/login",
    "title": "logs in the requesting user",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "logged",
            "description": "<p>in user successfully</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user.js",
    "groupTitle": "Users",
    "name": "PostLogin"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "logs out the requesting user",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user",
            "description": "<p>is logged out</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user.js",
    "groupTitle": "Users",
    "name": "PostLogout"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Create New User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>username of new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstName",
            "description": "<p>first name of new user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of new user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Sign",
            "description": "<p>up is successful</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./routes/user.js",
    "groupTitle": "Users",
    "name": "PostSignup"
  }
] });
