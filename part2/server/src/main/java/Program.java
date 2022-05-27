import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.Channel;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import io.netty.handler.logging.LogLevel;
import io.netty.handler.logging.LoggingHandler;


public class Program {
    public static void main(String[] args) throws InterruptedException {
        HotelDao hotelDao = new HotelDao();

        for (int i = 0; i < 10; i++) {
            Hotel hotel = new Hotel("Hotel " + i, i % 2 == 0, i % 3 == 0, i % 2 == 0 ? "Moscow" : "London");
            for (int j = 0; j < 100; j++) {
                hotel.rooms.add(new Room());
            }

            hotelDao.saveHotel(hotel);
        }

        int PORT = 8080;
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .handler(new LoggingHandler(LogLevel.INFO))
                    .childHandler(new HttpServerInitializer(null));
            // sslCtx= null if no
            Channel ch = b.bind(PORT).sync().channel();
            ch.closeFuture().sync();
        } finally {
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
