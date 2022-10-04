namespace API.Model
{
    public class Response
    {
        public dynamic data { get; set; }
        public int total { get; set; }
        public string exception_message { get; set; }
        public int status_code { get; set; }
    }
}
