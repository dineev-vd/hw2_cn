import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.handler.codec.ReplayingDecoder;
import io.netty.handler.codec.http.FullHttpRequest;
import io.netty.handler.codec.http.websocketx.*;

import java.io.File;
import java.nio.ByteBuffer;
import java.nio.file.Files;

public class WebSocketServerHandler extends SimpleChannelInboundHandler<Object> {
    WebSocketServerHandshaker handshaker;

    private void handleHttpRequest(ChannelHandlerContext ctx, FullHttpRequest req) {
        // ...
        // Handshake
        WebSocketServerHandshakerFactory wsFactory = new WebSocketServerHandshakerFactory(getWebSocketLocation(req), null, true);
        handshaker = wsFactory.newHandshaker(req);
        if (handshaker == null) {
            WebSocketServerHandshakerFactory.sendUnsupportedVersionResponse(ctx.channel());
        } else {
            handshaker.handshake(ctx.channel(), req);
        }
    }


    @Override
    protected void channelRead0(ChannelHandlerContext ctx, Object msg) throws Exception {
        if (msg instanceof FullHttpRequest) {
            handleHttpRequest(ctx, (FullHttpRequest) msg);
        } else if (msg instanceof WebSocketFrame) {
            handleWebSocketFrame(ctx, (WebSocketFrame) msg);
        }
    }

    private void handleWebSocketFrame(ChannelHandlerContext ctx, WebSocketFrame frame) {
        if (frame instanceof CloseWebSocketFrame) {
            handshaker.close(ctx.channel(), (CloseWebSocketFrame) frame.retain());
            return;
        }

        if (frame instanceof PingWebSocketFrame) {
            ctx.channel().write(new PongWebSocketFrame(frame.content()).retain());
            return;
        }

        if (!(frame instanceof TextWebSocketFrame)) {
            throw new UnsupportedOperationException(
                    String.format("%s frame types are not supported", frame.getClass().getName())
            );
        }

        ByteBuf byteBuf = frame.content();
        byte[] request = new byte[byteBuf.readableBytes()];
        byteBuf.readBytes(request);
        String s = new String(request);

        File f = new File(s);
        if(f.exists() && !f.isDirectory()) {
            try {
                ByteBuf fileBuffer = Unpooled.wrappedBuffer(Files.readAllBytes(f.toPath()));
                ctx.channel().write(new BinaryWebSocketFrame(fileBuffer).retain());
                ctx.channel().flush();
            } catch (Exception ignored) {

            }
        } else {
            System.out.println("no file");
            ctx.channel().write(new TextWebSocketFrame("FILE_NOT_FOUND").retain());
            ctx.channel().flush();
        }
    }

    private static String getWebSocketLocation(FullHttpRequest req) {
        return "ws://localhost:8080";
    }
}

