define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "group": "Sistema",
    "description": "<p>Realiza login no sistema</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwd",
            "description": "<p>Senha do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Params",
          "content": "body: { email: example@example.com, passwd: example }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: [{ data: \"OK\" }]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "Sistema",
    "name": "PostLogin"
  },
  {
    "type": "delete",
    "url": "/trail/:trailID",
    "title": "Remove",
    "group": "Trail",
    "description": "<p>Remove a trilha escolhida</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "trailID",
            "description": "<p>ID da trilha</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Params",
          "content": "http://localhost:3000/trail/1",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/trail.js",
    "groupTitle": "Trail",
    "name": "DeleteTrailTrailid"
  },
  {
    "type": "get",
    "url": "/trail/:trailID",
    "title": "Get All",
    "group": "Trail",
    "description": "<p>Retorna a trilha selecionada, seus pontos normais e de interesse</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "trailID",
            "description": "<p>ID da trilha</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Params",
          "content": "http://localhost:3000/trail/1",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: [\n        {\n            trailID: 1,\n            trailname: \"Trilha de exemplo\",\n            traildist: 1.27,\n            trailtime: \"1970-01-01T00:15:00.000Z\",\n            trailrat: 5,\n            traildescr: \"\",\n            mainlat: 0,\n            mainlong: 0,\n            user: \"Example\",\n            dtin: \"2017-11-09T00:00:00.000Z\",\n            dtstamp: \"2017-11-09T01:21:28.330Z\",\n            \"trail_points\": [\n                { pointID: 1, latitude: 34.093888, longitude: -118.3640725 }\n            ],\n            \"interest_points\": [\n                { pointID: 1, latitude: 34.093888, longitude: -118.3640725, type: \"Tipo 01\", description: \"\" }\n            ]\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/trail.js",
    "groupTitle": "Trail",
    "name": "GetTrailTrailid"
  },
  {
    "type": "get",
    "url": "/trails",
    "title": "Get All",
    "group": "Trail",
    "description": "<p>Retorna todas as trilhas cadastradas no sistema</p>",
    "success": {
      "examples": [
        {
          "title": "Response-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: [{ trailID: 1, trailname: \"Trilha de exemplo\", \"traildist\": 1.27, \"trailtime\": \"1970-01-01T00:15:00.000Z\", \"trailrat\": 5}]\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/trail.js",
    "groupTitle": "Trail",
    "name": "GetTrails"
  },
  {
    "type": "post",
    "url": "/trails",
    "title": "Create",
    "group": "Trail",
    "description": "<p>Cria uma nova trilha junto de seus pontos e pontos de interesse</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trailname",
            "description": "<p>Nome da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "traildist",
            "description": "<p>Distância total da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trailtime",
            "description": "<p>Duração da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "traildescr",
            "description": "<p>Descrição da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "trailrat",
            "description": "<p>Avaliação da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userID",
            "description": "<p>Quem está criando a trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "json[]",
            "optional": false,
            "field": "trail_points",
            "description": "<p>Pontos da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "json[]",
            "optional": false,
            "field": "interest_points",
            "description": "<p>Pontos de interesse da trilha</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Params",
          "content": "http://localhost:3000/trails?trailname=Trilha de exemplo&traildist=1.27&trailtime=00:15:00&trailrat=5&traildescr=&userID=1\nbody: { trail_points: [], interest_points: [] }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/trail.js",
    "groupTitle": "Trail",
    "name": "PostTrails"
  },
  {
    "type": "put",
    "url": "/trail/:trailID",
    "title": "Update",
    "group": "Trail",
    "description": "<p>Atualiza as informações da trilha escolhida</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "trailID",
            "description": "<p>ID da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trailname",
            "description": "<p>Nome da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "traildescr",
            "description": "<p>Descrição da trilha</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "trailrat",
            "description": "<p>Avaliação da trilha</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Params",
          "content": "http://localhost:3000/trail/1?trailname=Trilha de exemplo&traildescr=&trailrat=5",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/trail.js",
    "groupTitle": "Trail",
    "name": "PutTrailTrailid"
  },
  {
    "type": "delete",
    "url": "/user/:userID",
    "title": "Remove User",
    "group": "User",
    "description": "<p>Remove o usuário do sistema</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userID",
            "description": "<p>ID do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "http://localhost:3000/user/1",
          "content": "http://localhost:3000/user/1",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "DeleteUserUserid"
  },
  {
    "type": "get",
    "url": "/user/:userID",
    "title": "Get One",
    "group": "User",
    "description": "<p>Retorna um usuário específico do sistema</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "http://localhost:3000/user/1",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros encontrados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: [\n        { \n            userID: 1,\n            realname: \"Example\",\n            username: \"example\",\n            age: 20,\n            email: \"example@example.com\",\n            dtin: \"2017-11-08T00:00:00.000Z\",\n            dtstamp: \"2017-11-08T10:05:26.423Z\",\n            active: true,\n            description: '',\n            following: []\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "GetUserUserid"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get All",
    "group": "User",
    "description": "<p>Retorna todos os usuários cadastrados no sistema</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros encontrados</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: [\n        { userID: 1, realname: \"Example\", username: \"example\", age: 20, email: \"example@example.com\" }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "GetUsers"
  },
  {
    "type": "post",
    "url": "/user/:priUserID/follow",
    "title": "Follow User",
    "group": "User",
    "description": "<p>Segue outro usuário no sistema</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "priUserID",
            "description": "<p>ID do usuário a ser seguido</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userID",
            "description": "<p>ID do usuário que executa a ação</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Params",
          "content": "http://localhost:3000/user/2/follow?userID=1",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "PostUserPriuseridFollow"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create User",
    "group": "User",
    "description": "<p>Cria um novo usuário no sistema</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwd",
            "description": "<p>Senha do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Apelido do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Idade do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "http://localhost:3000/users?realname=Example&passwd=example&username=example&age=20&email=example@example.com",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "PostUsers"
  },
  {
    "type": "put",
    "url": "/user/:userID",
    "title": "Update User",
    "group": "User",
    "description": "<p>Atualiza um usuário do sistema</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "ID",
            "description": "<p>do usuário desejado</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "realname",
            "description": "<p>Nome do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "passwd",
            "description": "<p>Senha do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Apelido do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "age",
            "description": "<p>Idade do usuário</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "http://localhost:3000/user/1?realname=Example&passwd=example&username=example&age=20&email=example@example.com",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "PutUserUserid"
  },
  {
    "type": "put",
    "url": "/user/:userID/ativar",
    "title": "Active User",
    "group": "User",
    "description": "<p>Altera o estado do usuário para &quot;Ativo&quot;</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userID",
            "description": "<p>ID do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "http://localhost:3000/user/1/ativar",
          "content": "http://localhost:3000/user/1/ativar",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "PutUserUseridAtivar"
  },
  {
    "type": "put",
    "url": "/user/:userID/inativar",
    "title": "Inactive User",
    "group": "User",
    "description": "<p>Altera o estado do usuário para &quot;Inativo&quot;</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userID",
            "description": "<p>ID do usuário</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "http://localhost:3000/user/1/inativar",
          "content": "http://localhost:3000/user/1/inativar",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        },
        {
          "title": "Respose-Success",
          "content": "HTTP/1.1 200 OK\n{\n    count: 1,\n    rows: []\n}",
          "type": "json"
        }
      ],
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "count",
            "description": "<p>Quantidade de registros retornados</p>"
          },
          {
            "group": "Success 200",
            "type": "json[]",
            "optional": false,
            "field": "rows",
            "description": "<p>Registros retornados</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "controllers/user.js",
    "groupTitle": "User",
    "name": "PutUserUseridInativar"
  }
] });
