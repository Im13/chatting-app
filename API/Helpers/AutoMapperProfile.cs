using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser,MemberDTO>()
                .ForMember(destination => destination.PhotoUrl, 
                    opt => opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(dest => dest.Age, 
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
                

            CreateMap<Photo,PhotoDTO>();
            CreateMap<Message,MessageDTO>()
                .ForMember(des => des.RecipientPhotoUrl,
                    opt => opt.MapFrom(src => src.Recipient.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(des => des.SenderPhotoUrl,
                    opt => opt.MapFrom(src => src.Sender.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}