import 'dart:convert';
import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:ovite/shared/constants/constants.dart';
import 'package:ovite/shared/utils/validator.dart';

class DeliveryChatScreen extends StatefulWidget {
  const DeliveryChatScreen({super.key});

  @override
  State<DeliveryChatScreen> createState() => _DeliveryChatScreenState();
}

class _DeliveryChatScreenState extends State<DeliveryChatScreen> {

  final _formKeys = GlobalKey<FormState>();
  //IOWebSocketChannel channel; //channel variable for websocket
  late bool connected; // boolean value to track connection status
  bool inProgress = false;

  String myId = "222"; //my id
  String receiverId = "111"; //receiver id
  // swap myId and receiverId value on another mobile to test send and receive
  String auth = "chatapphdfgjd34534hjdfk"; //auth key

  List<ChatMessageData> msgList = [];

  TextEditingController eventMessageController = TextEditingController();
  /*
  channelConnect(){ //function to connect
    try{
      //channel = IOWebSocketChannel.connect("ws://192.168.0.109:6060/$myId"); //channel IP : Port
      channel.stream.listen((message) {
        log(message);
        setState(() {
          if(message == "connected"){
            connected = true;
            setState(() { });
            log("Connection established.");
          }else if(message == "send:success"){
            log("Message send success");
            setState(() {
              eventMessageController.text = "";
            });
          }else if(message == "send:error"){
            log("Message send error");
          }else if (message.substring(0, 6) == "{'cmd'") {
            log("Message data");
            message = message.replaceAll(RegExp("'"), '"');
            var jsonData = json.decode(message);

            msgList.add(ChatMessageData( //on message receive, add data to model
              eventMessageController: jsonData["eventMessageController"],
              userId: jsonData["userId"],
              isMe: false,
            )
            );
            setState(() { //update UI after adding data to message model

            });
          }
        });
      },
        onDone: () {
          //if WebSocket is disconnected
          log("Web socket is closed");
          setState(() {
            connected = false;
          });
        },
        onError: (error) {
          log(error.toString());
        },);
    }catch (_){
      log("error on connecting to websocket.");
    }
  }

  Future<void> sendMsg(String message, String id) async {
    if(connected == true){
      String msg = "{'auth':'$auth','cmd':'send','userid':'$id', 'eventMessageController':'$message'}";
      setState(() {
        inProgress = true;
        eventMessageController.text = "";
        msgList.add(ChatMessageData(eventMessageController: message, userId: myId, isMe: true));
      });
      channel.sink.add(msg); //send message to receiver channel
      setState(() {
        inProgress = false;
      });
    } else {
      channelConnect();
      setState(() {
        inProgress = false;
      });
      log("Websocket is not connected.");
    }
  }
  */
  void addMessageToMessageList(String message, bool sentByMe) {
    setState(() {
      msgList.insert(0, ChatMessageData(userId: myId, message: message, isMe: sentByMe));
    });
  }

  @override
  void initState() {
    connected = false;
    //eventMessageController.text = "";
    //channelConnect();
    super.initState();
  }

  @override
  void dispose() {
    eventMessageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
          children: [
            Expanded(child: msgList.isEmpty ?
                 const Center(
                  child: Text(
                    "Welcome, please type your reclamation. Then support will respond as soon as possible.",
                    textAlign: TextAlign.center,
                    style: TextStyle(fontSize: 20, fontFamily: 'monospace'),
                  ),
                )
                    : buildMessageListWidget()),
            if (inProgress)
              const LinearProgressIndicator(
                minHeight: 2,
              ),
            buildSendWidget(),
          ],
        );
        /*body: Container(
          padding: const EdgeInsets.only(top: 60.0),
          child: Stack(children: [
            Positioned(
                top:0,bottom:70,left:0, right:0,
                child:Container(
                    padding: const EdgeInsets.all(15),
                    child: SingleChildScrollView(
                        child:Column(children: [
                          const Text("Your Messages", style: TextStyle(fontSize: 20)),
                          Column(
                            children: msgList.map((onemsg){
                              return Container(
                                  margin: EdgeInsets.only( //if is my message, then it has margin 40 at left
                                    left: onemsg.isMe?40:0,
                                    right: onemsg.isMe?0:40, //else margin at right
                                  ),
                                  child: Card(
                                      color: onemsg.isMe?Colors.blue[100]:Colors.red[100],
                                      //if its my message then, blue background else red background
                                      child: Container(
                                        width: double.infinity,
                                        padding: const EdgeInsets.all(15),

                                        child: Column(
                                          crossAxisAlignment: CrossAxisAlignment.start,
                                          children: [
                                            Text(onemsg.isMe?"ID: ME":"ID: ${onemsg.userId}"),
                                            Container(
                                              margin: const EdgeInsets.only(top:10,bottom:10),
                                              child: Text("Message: ${onemsg.message}", style: const TextStyle(fontSize: 17)),
                                            ),
                                          ],),
                                      )
                                  )
                              );
                            }).toList(),
                          )
                        ],)
                    )
                )
            ),
            Positioned(  //position text field at bottom of screen
              bottom: 0, left:0, right:0,
              child: Container(
                  color: Colors.black12,
                  height: 70,
                  child: Row(children: [
                    Expanded(
                        child: Container(
                          margin: const EdgeInsets.all(10),
                          child: TextFormField(
                            autofocus: true,
                            controller: eventMessageController,
                            validator: (String? value) {
                              return Validator.validateText(value);
                            },
                            decoration: const InputDecoration(
                                hintText: "Enter your Message"
                            ),
                          ),
                        )
                    ),
                    Container(
                        margin: const EdgeInsets.all(10),
                        child: ElevatedButton(
                          child: const Icon(Icons.send),
                          onPressed: (){
                            if(eventMessageController.text != ""){
                              //sendMsg(eventMessageController.text, receiverId); //send message with websocket
                              setState(() {
                                msgList.add(ChatMessageData(eventMessageController: eventMessageController.text , userId: myId, isMe: false));
                                eventMessageController.text = "";
                              });
                            }else{
                              log("Enter message");
                            }
                          },
                        )
                    )
                  ],)
              ),
            )
          ],),
        )*/
  }

  Widget buildMessageListWidget() {
    return ListView.builder(
      itemBuilder: (context, index) {
        return buildSingleMessageRow(msgList[index]);
      },
      reverse: true,
      itemCount: msgList.length,
    );
  }

  Widget buildSingleMessageRow(ChatMessageData messageModel) {
    return Container(
      padding: const EdgeInsets.all(10),
      child: Align(
        alignment: messageModel.isMe ? Alignment.topRight : Alignment.topLeft,
        child: Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(20),
              color: messageModel.isMe ? Colors.blue[200] : Colors.grey.shade300,
            ),
            padding: const EdgeInsets.all(10),
            child: Text(messageModel.message, style: const TextStyle(fontSize: 16,),)
        ),
      ),
    );
  }

  Widget buildSendWidget() {
    return Container(
      color: Colors.white,
      height: 60,
      padding: const EdgeInsets.all(10),
      child: Form(
          key: _formKeys,
          child: Row(
            children: [
              Expanded(
                  child: TextFormField(
                    controller: eventMessageController,
                    decoration: const InputDecoration(
                      hintText: "How can i help you?",
                      border: InputBorder.none,
                  ),
              )),
              const SizedBox(
                width: 16,
              ),
              FloatingActionButton(
                onPressed: () {
                  String question = eventMessageController.text.toString();
                  if (question.isEmpty) return;
                  eventMessageController.clear();
                  addMessageToMessageList(question, true);
                  //sendMessageToAPI(question);
                },
                elevation: 0,
                child: const Icon(
                  Icons.send,
                  size: 18,
                ),
              ),
        ],
      )),
    );
  }
}

class ChatMessageData{ //message data model
  String message, userId;
  bool isMe;
  ChatMessageData({required this.message,required  this.userId,required  this.isMe});
}