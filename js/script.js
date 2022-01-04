// L’esercizio si svolgerà in 3 giorni + alcune milestone e bonus per le vacanze.
// Milestone 1
// Replica della grafica con la possibilità di avere messaggi scritti dall’utente(verdi) e dall’interlocutore(bianco) assegnando due classi CSS diverse
// Visualizzazione dinamica della lista contatti: tramite la direttiva v -for, visualizzare nome e immagine di ogni contatto

// Milestone 2
// Visualizzazione dinamica dei messaggi: tramite la direttiva v -for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
// Click sul contatto mostra la conversazione del contatto cliccato

const app = new Vue(
    {
        el: '#app',
        data: {
            contacts: [
                {
                    name: "Michele",
                    avatar: "_1",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            text: "Hai portato a spasso il cane?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Ricordati di dargli da mangiare",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 16:15:22",
                            text: "Tutto fatto!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Fabio",
                    avatar: "_2",
                    visible: true,
                    messages: [
                        {
                            date: "20/03/2020 16:30:00",
                            text: "Ciao come stai?",
                            status: "sent",
                        },
                        {
                            date: "20/03/2020 16:30:55",
                            text: "Bene grazie! Stasera ci vediamo?",
                            status: "received",
                        },
                        {
                            date: "20/03/2020 16:35:00",
                            text: "Mi piacerebbe ma devo andare a fare la spesa.",
                            status: "sent",
                        },
                    ],
                },

                {
                    name: "Samuele",
                    avatar: "_3",
                    visible: true,
                    messages: [
                        {
                            date: "28/03/2020 10:10:40",
                            text: "La Marianna va in campagna",
                            status: "received",
                        },
                        {
                            date: "28/03/2020 10:20:10",
                            text: "Sicuro di non aver sbagliato chat?",
                            status: "sent",
                        },
                        {
                            date: "28/03/2020 16:15:22",
                            text: "Ah scusa!",
                            status: "received",
                        },
                    ],
                },
                {
                    name: "Luisa",
                    avatar: "_6",
                    visible: true,
                    messages: [
                        {
                            date: "10/01/2020 15:30:55",
                            text: "Lo sai che ha aperto una nuova pizzeria?",
                            status: "sent",
                        },
                        {
                            date: "10/01/2020 15:50:00",
                            text: "Si, ma preferirei andare al cinema",
                            status: "received",
                        },
                    ],
                },
            ],
            counter: 0,
            text: '',
            searchChat: '',
            clickedMessage: {
                index: false,
                show: false
            }
        },
        methods: {
            selectChat: function (index) {
                return this.counter = index;
            },

            // funzione nuovo messaggio
            newMessage: function () {
                // imposto data corrente
                dayjs.extend(window.dayjs_plugin_customParseFormat);
                let currentDay = dayjs().format("DD/MM/YYYY HH:mm:ss");
                
                // controllo non sia un testo vuoto
                if (this.text != '' && this.text.length != 0) {

                    // pusho il messaggio
                    this.contacts[this.counter].messages.push(
                        {
                            date: currentDay,
                            text: this.text,
                            status: "sent",
                        }
                    );
                }
                this.text = '';

                // timeout risposta
                setTimeout(() => {
                    this.contacts[this.counter].messages.push(
                        {
                            date: currentDay,
                            text: 'ok',
                            status: "received",
                        })
                }, 1000);
            },
            searchUser: function () {
                this.contacts.forEach((contact) => {
                    if (contact.name.toLowerCase().includes(this.searchChat.toLowerCase())) {
                        contact.visible = true;
                    } else {
                        contact.visible = false;
                    }
                });
            },

            // funzione menu info-cancella

            messageMenu: function (index) {
                if (this.clickedMessage.index !== index && this.clickedMessage.index !== false) {
                    this.clickedMessage.show = false;
                    this.clickedMessage.index = false;
                }
                this.clickedMessage.show = !this.clickedMessage.show;
                this.clickedMessage.index = index;
            },

            // funzione cancella messaggio
            cancelMessage: function (index) {
                let selectedMessage = this.contacts[this.counter].messages;
                selectedMessage.splice(index, 1);

                this.clickedMessage.show = false;
                this.clickedMessage.index = false;
            }
        },
    },
)