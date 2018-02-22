# 运行

* npm install

2. 更新 graphql 的 schema 到本地生成 schema.json（保证本地后端启动且正常运行，且是相对应的版本，因为schema不匹配会导致字段无法查到）

* npm run update-schema

3. 编译 relay 的 query 和 mutation（每次运行项目都要另开一个窗口执行该命令，实时生成relay所需要的文件）

* npm run relay

4. 启动项目

* npm start

5. 在浏览器中输入 http://localhost:3000