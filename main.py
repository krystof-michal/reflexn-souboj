def on_button_pressed_a():
    global start
    basic.show_string("CEKEJ")
    basic.pause(2000)
    basic.show_icon(IconNames.HEART)
    start = input.running_time()
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global CAS
    CAS = input.running_time() - start
    basic.show_number(CAS)
input.on_button_pressed(Button.B, on_button_pressed_b)

CAS = 0
start = 0
rekord = 0