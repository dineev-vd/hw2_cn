./proto/bin/protoc --java_out=./server/src/main/java/ ./protocol.proto
./proto/bin/protoc --plugin=./client/node_modules/.bin/protoc-gen-ts_proto ./protocol.proto --ts_proto_out=./client/src --ts_proto_opt=esModuleInterop=true